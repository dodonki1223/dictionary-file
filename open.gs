// Googleスプレッドシートの表示時イベント
function onOpen() {
  // 独自メニューを追加
  SpreadsheetApp
    .getActiveSpreadsheet()
    .addMenu('追加機能', [
      {name: 'Mac標準辞書ファイルのダウンロード', functionName: 'showDownloadForPlistFile'},
      {name: 'Google日本語入力辞書ファイルのダウンロード', functionName: 'showDownloadForGoogleFile'},
    ]);
}
