/**
 * Copyright (C) 2013-2014, Infthink (Beijing) Technology Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.ß
 */

'use strict';
var flingUtils = (function () {
  var flingSocket = null;

  var initFlingdSocket = function () {
    flingSocket = navigator.mozTCPSocket.open('127.0.0.1', '9440', {binaryType: 'string'});

    flingSocket.onopen = function (event) {
      console.log("connected to fling server!");
      flingdStatusChange(ConnectService.getDevicesStatus());
    };

    flingSocket.onerror = function (event) {
      console.error("fling Socket error ");
    };

    flingSocket.onclose = function (event) {
      event.target.close();
      window.setTimeout(function () {
        initFlingdSocket();
      }, 5000);
    };
  };

  var flingdStatusChange = function (message) {
    if (flingSocket !== null && flingSocket.readyState === "open") {
      window.setTimeout(function () {
          flingSocket.send(message.length + ":" + message);
      }, 1000);
    }
  };

  function init() {
    initFlingdSocket();
  }

  return {
    init: init,
    flingdStatusChange: flingdStatusChange
  }
})();

