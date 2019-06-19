const attachListeners = () => {
    const headImages = document.getElementsByClassName('illustrationImage');
    for (var i = 0; i < headImages.length; i++) {
        let image = headImages[i];
        if (i == 0) {
            image.className += " illustrationImageSelected";
        }
        image.addEventListener('click', changeSelection, false);
    }

    const flags = document.getElementsByClassName('flag');
    for (var i = 0; i < flags.length; i++) {
        let flag = flags[i];
        flag.addEventListener('click', changeCountrySelection, false);
    }
}

const getFileNameForImage = (image) => {
    if (image.src == null) {
        return "";
    }
    let pathComponents = image.src.split('/');
    if (pathComponents.length < 2) {
        return "";
    }

    return pathComponents.slice(-1)[0];
}

const changeSelection = (e) => {
    let srcImage = e.srcElement;
    let animalPath = getFileNameForImage(srcImage);
    if (animalPath == null || animalPath.length == 0) {
        return;
    }
    const headImages = document.getElementsByClassName('illustrationImage');
    var updatedAnimal = false;
    for (var i = 0; i < headImages.length; i++) {
        let image = headImages[i];
        let currentAnimalPath = getFileNameForImage(image);
        let currentIsSelected = image.className.includes("illustrationImageSelected");
        if (currentAnimalPath == animalPath && currentIsSelected == false) {
            updatedAnimal = true;
            image.className += ' illustrationImageSelected';
        } else if (currentAnimalPath != animalPath && currentIsSelected) {
            image.className = image.className.replace(' illustrationImageSelected', '')
        }
    }
    let animalName = animalPath.split('-')[0];
    if (updatedAnimal && animalName.length > 0) {
        const mainImage = document.getElementsByClassName('illustrationMainImage')[0];
        mainImage.src = 'assets/illustrations-main/' + animalName + '.png';
        mainImage.className = "illustrationMainImage " + animalName;
    }

    const selectedCountries = document.getElementsByClassName('flag flagSelected');
    if (selectedCountries.length == 0) {
        return;
    }
    let flag = selectedCountries[0];
    let country = getCountryFromFlag(flag);
    updateAnimalHat(country, animalName);
}

const getCountryFromFlag = (image) => {
    if (image.src == null || image.src.length == "") {
        return;
    }
    let pathComponents = image.src.split('/');
    if (pathComponents.length < 2) {
        return "";
    }

    let imageName = pathComponents.slice(-1)[0];
    let imageComponents = imageName.split("-");
    return imageComponents[0];
}

const changeCountrySelection = (e) => {
    let image = e.srcElement;
    if (image == null) {
        return;
    }

    var countrySelected = false;
    if (image.className.includes("flagSelected")) {
        image.className = image.className.replace(" flagSelected", " flagUnselected");
    } else {
        countrySelected = true;
        image.className += " flagSelected";
    }

    const flags = document.getElementsByClassName('flag');
    for (var i = 0; i < flags.length; i++) {
        let flag = flags[i];
        if (image != flag && flag.className.includes("flagSelected")) {
            flag.className = flag.className.replace(" flagSelected", "")
        }
    }

    if (countrySelected) {
        let country = getCountryFromFlag(image);
        const selectedAnimalImages = document.getElementsByClassName('illustrationImage illustrationImageSelected');
        if (selectedAnimalImages.length == 0) {
            return;
        }
        const animalPath = getFileNameForImage(selectedAnimalImages[0]);
        let animalName = animalPath.split('-')[0];
        updateAnimalHat(country, animalName);
    } else {
        removeAnimalHat();
    }
}

const updateAnimalHat = (country, animal) => {
    const hatImages = document.getElementsByClassName('illustrationHat');
    if (hatImages.length == 0) {
        return;
    }
    let hatImage = hatImages[0];
    hatImage.src = "/assets/hats/" + animal + "-" + country + ".png";
    hatImage.className = "illustrationHat " + animal + "-" + country + "-hat";
}

const removeAnimalHat = () => {
    const hatImages = document.getElementsByClassName('illustrationHat');
    if (hatImages.length == 0) {
        return;
    }
    let hatImage = hatImages[0];
    if (hatImage.className.includes('hidden') == false) {
        hatImage.className += " hidden";
    }
}

attachListeners();
