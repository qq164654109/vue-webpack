<template>
  <div class="test-upload">
    <el-button-group class="upload-btns">
      <el-button :disabled="changeDisabled">
        <i class="el-icon-upload2 el-icon--left" size="mini"></i>选择文件
        <input type="file" :multiple="multiple" class="select-file-input" :accept="accept" @change="handleFileChange" />
      </el-button>
      <el-button :disabled="uploadDisabled" @click="handleUpload"><i class="el-icon-upload el-icon--left" size="mini"></i>上传</el-button>
      <el-button :disabled="!pauseDisabled" @click="handlePause"><i class="el-icon-video-pause el-icon--left" size="mini"></i>暂停</el-button>
      <el-button :disabled="resumeDisabled" @click="handleResume"><i class="el-icon-video-play el-icon--left" size="mini"></i>恢复</el-button>
      <el-button :disabled="clearDisabled" @click="clearFiles"><i class="el-icon-video-play el-icon--left" size="mini"></i>清空</el-button>
    </el-button-group>
    <div class="file-list" v-if="uploadFile">
      <div class="file-item">
        <div class="name text-truncate">名称：{{uploadFile.raw.name}}</div>
        <div class="size text-truncate">大小：{{uploadFile.raw.size}} kb</div>
        <el-progress class="progress" :percentage="uploadFile.uploadProgress" :show-text="false"></el-progress>
        <div class="status">状态：{{uploadFile.status}}</div>
        <el-popover class="detail" popper-class="upload-detail-popper" placement="bottom" width="150" trigger="click">
          <span slot="reference">详情</span>
          <ul class="chunk-list clearfix">
            <li class="chunk-item" v-for="item in uploadFile.chunkList" :key="item.index">
              <div class="upload-block" :style="{transform: `translateY(-${(1 - item.uploadProgress) * 100}%)`}"></div>
            </li>
          </ul>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import { requestFileUpload } from '@/api/file';
  import { transFormData } from '@/utils';
  // 推荐的分块大小是2M-5M，具体size根据产品中文件上传的大小分布来定。
  // 如果上传的文件大部分是500M以上，很大的文件，建议是5M, 如果相对较小，推荐2M。
  const CHUNK_SIZE = 2 * 1024 * 1024;
  const THREADS = 3;
  const RETRY = 0;
  const STATUS_VERTIFY = '校验中';
  const STATUS_WAIT = '待上传';
  const STATUS_UPLOADING = '上传中';
  const STATUS_SUCCESS = '成功';
  const STATUS_ERROR = '失败';
  const STATUS_SECOND_PASS = '秒传';
  const STATUS_PAUSE = '暂停';
  const STATUS_RESUME = '恢复';
  export default {
    data() {
      return {
        uploadFile: null,
        status: null,
        multiple: false,
        accept: '*',
        changeDisabled: false,
        resumeDisabled: true,
        clearDisabled: true
      }
    },
    computed: {
      uploadDisabled() {
        return !this.uploadFile;
      },
      pauseDisabled() {
        return this.uploadFile && this.uploadFile.status == STATUS_UPLOADING;
      },
    },
    methods: {
      RequestCommonUpload(file) {
        return requestFileUpload({
          template: {
            type: 'common'
          },
          data: transFormData({ file: file.raw })
        })
      },
      RequestChunkUpload(file) {
        return requestFileUpload({
          template: {
            type: 'chunk'
          },
          data: transFormData({ file: file.raw })
        })
      },
      handleFileChange(e) {
        const file = e.target.files[0];
        this.uploadFile = this.createFileItem(file);
      },
      handleUpload() {
        if (this.uploadFile.raw.size <= CHUNK_SIZE) {
          // 小于切片大小，调用正常上传接口
          this.RequestCommonUpload(this.uploadFile)
        } else {
          this.uploadFile.chunkList = this.createFileChunks(this.uploadFile.raw, CHUNK_SIZE);
          console.log(this.uploadFile.chunkList)
          this.threadsSendRequest(this.uploadFile.chunkList.map(chunk => {
            return this.RequestChunkUpload.bind(this, chunk);
          }), THREADS, RETRY).then(() => {
            console.log('我好了！');
          });
        }
      },
      handlePause() {
        
      },
      handleResume() {

      },
      createFileItem (file) {
        return {
          status: STATUS_VERTIFY,
          chunkList: [],
          uploadProgress: 0,
          hashProgress: 0,
          raw: Object.freeze(file)
        }
      },
      createFileChunks(file, chunkSize) {
        let chunkList = [], count = 0, index = 0;
        while (count < file.size) {
          let chunk = file.slice(count, count + chunkSize);
          chunkList.push({
            key: 1,
            index: index,
            uploadProgress: 0.5,
            status: STATUS_WAIT,
            raw: Object.freeze(chunk)
          });
          index ++;
          count += chunkSize;
        }
        return chunkList;
      },
      calcUploadProgress(file) {
        return file.chunkList.reduce((result, item, index) => {
          result += item.uploadProgress;
          if (index === file.length - 1) {
            result = result / file.length;
          }
          return result;
        }, 0);
      },
      clearFiles() {

      },
      threadsSendRequest(queue, threads, retry) {
        let retryArr = []
        return new Promise((resolve, reject) => {
          const requestList = Array.from({ length: queue.length > threads ? threads : queue.length }, (v, i) => ({
            index: i,
            fn: queue.shift()
          }));
          const requestHandler = (request) => {
            const { index, fn } = request;
            return fn().catch((err) => {
              !retryArr[index] && (retryArr[index] = 0);
              if (retryArr[index] >= retry) {
                return;
              } else {
                retryArr[index] ++;
                console.log(err + ' 重试')
                return Promise.resolve(requestHandler(request));
              }
            })
          }
          Promise.allSettled(requestList.map(request => {
            return requestHandler(request);
          })).then(results => {
            if (queue.length === 0) {
              resolve();
            } else {
              return resolve(this.threadsSendRequest(queue, threads, retry));
            }
          });
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
.test-upload {
  padding: 10px 0;
  .upload-btns {
    position: relative;
    .select-file-input {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border: none;
      opacity: 0;
      cursor: pointer;
    }
  }
  .file-list {
    margin-top: 20px;
  }
  .file-item {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    margin-right: 15px;
    text-align: left;
    color: $color-form-txt;
    .name {
      flex: 0 0 240px;
    }
    .size {
      flex: 0 0 140px;
    }
    .progress {
      flex: 1;
      max-width: 300px;
      margin: 0 30px;
    }
    .status {
      flex: 0 0 100px;
    }
    .detail {
      flex: 0 0 100px;
      text-align: center;
      color: $color-main;
      cursor: pointer;
    }
  }
}
.upload-detail-popper {
  .chunk-list {
    list-style: none;
    width: 150px;
    margin: 0;
    padding: 0;
    border-top: 1px solid $color-border-line;
    border-left: 1px solid $color-border-line;
  }
  .chunk-item {
    float: left;
    width: 14px;
    height: 14px;
    border-right: 1px solid $color-border-line;
    border-bottom: 1px solid $color-border-line;
    overflow: hidden;
    .upload-block {
      height: 100%;
      background-color: $color-success;
    }
  }
}
</style>