// responseCombiner.js

const documentArrangeUtil = (
  requestBody,
  preprocessingData,
  predictionData,
  includeRois = false
) => {
  const documentArranged = {
    camera_id: requestBody.camera_id,
    file_name: preprocessingData.file_name,
    slots: preprocessingData.slots.map((slot, index) => {
      const correspondingPrediction = predictionData.find(
        (pred) => pred.index === index
      );
      return {
        coordinate: slot.coordinate,
        prediction: correspondingPrediction
          ? correspondingPrediction.prediction
          : null,
        file_name: slot.file_name,
        lot_name: slot.lot_name,
        roi: includeRois ? slot.roi : null,
      };
    }),
  };

  return documentArranged;
};

module.exports = { documentArrangeUtil };
