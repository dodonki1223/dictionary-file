// PropertiesService
var prop = PropertiesService.getScriptProperties();

var Config = {
  OutputFolderID  : prop.getProperty("OUTPUT_FOLDER_ID"),
  MacSheetName    : prop.getProperty("MAC_SHEET_NAME"),
  GoogleSheetName : prop.getProperty("GOOGLE_SHEET_NAME")
};


// Configが正しく設定されているか確認用のメソッド
function TestConfig(){
  Logger.log("OutputFolderID：" + Config.OutputFolderID);
  Logger.log("MacSheetName：" + Config.MacSheetName);
  Logger.log("GoogleSheetName：" + Config.GoogleSheetName);
}