/**
 * Google日本語入力用の辞書ファイルフォーマットの文字列を作成
 * @return {String} Google日本語入力の辞書ファイルフォーマットのテキスト
 */
function createTextFile() {
  var sheet = getSheet('Google日本語入力');
  var dictionaryData = sheet.getRange(1, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  var textContent = '';
  
  dictionaryData.forEach(function(data){
    textContent += data[0] + '\t' + data[1] + '\t' + data[2] + '\n';
  });
  
  return textContent;
}