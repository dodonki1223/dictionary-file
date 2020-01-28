/**
 * plistファイルのヘッダー文字列を作成
 * @return {String} plistファイルのヘッダー文字列
 */
function plistHeader() {
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
         '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n' +
         '<plist version="1.0">\n' +
         '<array>\n';
}

/**
 * plistファイルのフッター文字列を作成
 * @return {String} plistファイルのフッター文字列
 */
function plistFooter(){
  return '</array>\n' +
         '</plist>';
}

/**
 * plistFile用（Mac標準用の辞書ファイルフォーマット）の文字列を作成
 * @return {String} plistフォーマットのテキスト
 */
function createPlistFile() {
  var sheet = getSheet('mac標準');
  var dictionaryData = sheet.getRange(1, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  var plistContent = plistHeader();
  
  dictionaryData.forEach(function(data){
    plistContent += '\t<dict>\n';
    plistContent += '\t\t<key>phrase</key>\n';
    plistContent += '\t\t<string>' + escapeXmlString(data[0]) + '</string>\n';
    plistContent += '\t\t<key>shortcut</key>\n';
    plistContent += '\t\t<string>' + escapeXmlString(data[1]) + '</string>\n';
    plistContent += '\t</dict>\n';
  });
  
  plistContent += plistFooter();

  return plistContent;
}

/**
 * Xmlファイルのエスケープ処理
 * ref:http://kotaroito.hatenablog.com/entry/2015/08/25/150317
 * @param {String} [str] - エスケープ対象の文字列
 * @return {String} 特定の文字のエスケープ後の文字列
 */
function escapeXmlString(str){
  str = escapeString(str, '&', '&amp;');
  str = escapeString(str, "'", '&apos;');
  str = escapeString(str, '"', '&quot;');
  str = escapeString(str, '>', '&gt;');
  str = escapeString(str, '<', '&lt;');

  return str;
}

/**
 * エスケープ処理
 * @return {String} エスケープ後の文字列
 */
function escapeString(str, before, after){
  if (str.indexOf(before) != -1) {
    str = str.split(before);
    return str.join(after);
  }
  return str;
}
