var trainedModelData = trainedData;
var stratifiedTrainedModelData = trainedStratifiedData;

Init()

function Init()
{
  var tbody = d3.select("tbody");
  
  // Create a table by appending to the tbody element
  var HiddenLayers = trainedModelData.Hidden_Layers;
  var EpochsCount = trainedModelData.Epochs_Count;
  var TotalNodeCount = trainedModelData.Total_Node_Count;
  var TrainDataAccuracy = trainedModelData.Train_Data_Accuracy;
  var TestDataLoss = trainedModelData.Test_Data_Loss;
  var TestDataAccuracy = trainedModelData.Test_Data_Accuracy;

  var StratHiddenLayers = stratifiedTrainedModelData.Hidden_Layers;
  var StratEpochsCount = stratifiedTrainedModelData.Epochs_Count;
  var StratTotalNodeCount = stratifiedTrainedModelData.Total_Node_Count;
  var StratTrainDataAccuracy = stratifiedTrainedModelData.Train_Data_Accuracy;
  var StratTestDataLoss = stratifiedTrainedModelData.Test_Data_Loss;
  var StratTestDataAccuracy = stratifiedTrainedModelData.Test_Data_Accuracy;

  for(i=0;i<36;i++) {
    var row = tbody.append("tr");
    row.append("td").text(HiddenLayers[i]);
    row.append("td").text(EpochsCount[i]);
    row.append("td").text(TotalNodeCount[i]);
    row.append("td").text(TrainDataAccuracy[i]);
    row.append("td").text(TestDataLoss[i]);
    row.append("td").text(TestDataAccuracy[i]);
  }

  for(i=0;i<36;i++) {
    var row = d3.select(".strat").append("tr");
    row.append("td").text(StratHiddenLayers[i]);
    row.append("td").text(StratEpochsCount[i]);
    row.append("td").text(StratTotalNodeCount[i]);
    row.append("td").text(StratTrainDataAccuracy[i]);
    row.append("td").text(StratTestDataLoss[i]);
    row.append("td").text(StratTestDataAccuracy[i]);
  }

  
}