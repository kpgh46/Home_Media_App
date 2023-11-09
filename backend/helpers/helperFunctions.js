const fs = require("fs").promises;
const path = require("path");

let getCoverPhoto = async (filePath) => {
	const coverFiles = await fs.readdir(filePath);

	const coverImageFiles = coverFiles.filter((file) =>
		/\.(jpg|jpeg|png)$/i.test(file)
	);

	const imageName = coverImageFiles[0];
	return imageName;
};

let getFolderNames = async (filePath) => {
	// Async method which will read the directory of the given path
	const pictureDir = await fs.readdir(filePath);

	// Takes the directory names and filters out "DS_Store"
	let years = pictureDir.filter((dir) => dir !== ".DS_Store");

	// The contents array will be populated after reading all directories
	let yearsAndContents = await Promise.all(
		years.map(async (year) => {
			const yearPath = path.join(filePath, year);
			const contents = await fs.readdir(yearPath);

			const images = contents.filter(
				(file) =>
					!file.startsWith(".") && /\.(jpg|jpeg|png)$/i.test(file)
			);

			return {
				year: year,
				contents: images,
			};
		})
	);

	// Sort the yearsAndContents by year after all asynchronous operations have finished
	yearsAndContents.sort((a, b) => a.year.localeCompare(b.year));

	return yearsAndContents;
};

module.exports = { getCoverPhoto, getFolderNames };
