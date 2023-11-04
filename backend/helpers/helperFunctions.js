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
	// async method which will read the directory of the given path
	const pictureDir = await fs.readdir(filePath);

	// takes the directory names and filters out "DS_Store"
	let years = pictureDir.filter((dir) => dir !== ".DS_Store");
	let yearsAndContents = [];

	//  Promise.all awaits looping through years.  years maps
	await Promise.all(
		years.map(async (year) => {
			const yearPath = path.join(filePath, year);
			const contents = await fs.readdir(yearPath);

			const images = contents.filter(
				(file) =>
					!file.startsWith(".") && /\.(jpg|jpeg|png)$/i.test(file)
			);
			yearsAndContents.push({
				year: year,
				contents: images,
			});
		})
	);

	return yearsAndContents;
};

module.exports = { getCoverPhoto, getFolderNames };
