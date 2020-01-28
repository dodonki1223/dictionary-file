/**
 * plistのファイルダウンロードダイアログの表示
 */
function showDownloadForPlistFile(){
  showDownload('dictionary.plist', 'application/xml', 'UTF-8', createPlistFile());
}

/**
 * Google日本語入力の辞書ファイルダウンロードダイアログの表示
 */
function showDownloadForGoogleFile(){
  showDownload('dictionary.txt', 'text/plain', 'UTF-8', createTextFile());
}

/**
 * ダウンロードダイアログの表示
 */
function showDownload(fileName, contentType, charSet, text) {
  var textBlob = convertTextToBolb(text, contentType, 'UTF-8', fileName)
  var createFile = createFileToDrive(textBlob);
  var downloadUrl = buildDownloadUrl(createFile.getId());
  var html = buildDownloadHtml(text, downloadUrl, 500, 600, 600);

  var ui = SpreadsheetApp.getUi();
  ui.showModalDialog(html, fileName);
}

/**
 * ダウンロード用のHTMLを作成する
 * @param {String} [content] - 表示内容
 * @param {String} [url] - ダウンロードURL
 * @param {String} [htmlHeight] - htmlの高さ
 * @param {String} [dialogWidth] - ダイアログの幅
 * @param {String} [dialogHeight] - ダイアログの高さ
 * @return {HtmlOutput} HTML ServiceのObjectd
 */
function buildDownloadHtml(content, url, htmlHeight, dialogWidth, dialogHeight){
  // htmlのテンプレートを取得
  var html = HtmlService.createTemplateFromFile('download_template');
  
  // htmlに埋め込む値をセット
  html.body = content;
  html.url = url;
  html.height = '' + htmlHeight + 'px;';
  
  // ダイアログのサイズ設定
  downloadHtml = html.evaluate().setHeight(dialogWidth).setWidth(dialogHeight);
  
  return downloadHtml;
}

/**
 * ダウンロード用のHTMLを作成する
 * @param {String} [content] - テキストデータ
 * @param {String} [contentType] - コンテンツタイプ
 * @param {String} [charSet] - 文字コード
 * @param {String} [fileName] - ファイル名
 * @return {Blob} 変換されたテキストのBlob
 */
function convertTextToBolb(textData, contentType, charSet, fileName){
  return Utilities.newBlob('', contentType, fileName).setDataFromString(textData, charSet);
}

/**
 * GoogleDriveにファイルを作成する
 * @param {Blob} [blob] - ファイルを作成するblog
 * @return {File} 作成されたFileObject
 */
function createFileToDrive(blob){
  var targetFolder = DriveApp.getFolderById('hogeId');
  
  // ファイルがすでに存在している時は削除する
  var files = targetFolder.getFilesByName(blob.getName());
  if (files.hasNext()) {
    var deleteFile = files.next();
    targetFolder.removeFile(deleteFile);
  }
  
  return targetFolder.createFile(blob);
}

/**
 * ファイルのダウンロードURLを作成する
 * @param {Number} [fileId] - FileObjectのID
 * @return {String} ファイルへのダウンロードURL
 */
function buildDownloadUrl(fileId){
  return 'https://drive.google.com/u/0/uc?export=download&id=' + fileId;
}
  