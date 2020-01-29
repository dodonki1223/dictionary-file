/**
 * Google日本語入力用の辞書ファイルフォーマットの文字列を作成
 * @return {String} Google日本語入力の辞書ファイルフォーマットのテキスト
 */
function createTextFile() {
  var sheet = getSheet(Config.GoogleSheetName);
  var dictionaryData = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
  var textContent = '';
  
  dictionaryData.forEach(function(data){
    textContent += data[0] + '\t' + data[1] + '\t' + convertUndefinedToEmptyCharacter(data[2]) + '\t' + convertUndefinedToEmptyCharacter(data[3]) + '\n';
  });
  
  return textContent;
}

/**
 * undefinedの時は空文字を返す
 * @param {String} [target] - 文字列
 * @return {String} undefinedの時は空文字をそれ以外はそのまま返す
 */
function convertUndefinedToEmptyCharacter(target){
  return (target == undefined) ? '' : target;
}
