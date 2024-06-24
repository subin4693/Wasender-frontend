import React, { useState, useEffect } from "react";
import {
	TextClassifier,
	FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0";

const useClassification = () => {
	const [type, setType] = useState("");
	async function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const classifiCationFun = async (message) => {
		if (!message?.trim()) return;
		const text = await FilesetResolver.forTextTasks(
			"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0/wasm",
		);
		const textClassifier = await TextClassifier.createFromOptions(text, {
			baseOptions: {
				modelAssetPath: `https://storage.googleapis.com/mediapipe-models/text_classifier/bert_classifier/float32/1/bert_classifier.tflite`,
			},
			maxResults: 5,
		});
		if (!textClassifier) {
			console.error("Text classifier is not yet initialized.");
			return;
		}
		if (message === "") {
			alert(
				"Please write some text, or click 'Populate text' to add text",
			);
			return;
		}
		await sleep(500);
		const result = textClassifier.classify(message);
		let preditctResult = result.classifications[0].categories;

		preditctResult.forEach((text) => {
			if (text.categoryName === "positive") {
				console.log("Positive" + text.score);
				setType("Positive");
			} else {
				console.log("Negative" + text.score);
				setType("Negative");
			}
			if (text.score * 100 >= 60) {
				console.log(text.score);
				//textToSpeech(text.categoryName);
			}
		});
	};

	return { classifiCationFun, type };
};

export default useClassification;
