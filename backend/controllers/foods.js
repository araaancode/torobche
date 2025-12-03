exports.getFoods = async (req, res) => {
    res.send("get foods")
}

exports.getFood = async (req, res) => {
    res.send("get single food")
}

exports.createFood = async (req, res) => {
    res.send("create food")
}

exports.updateFood = async (req, res) => {
    res.send("update food")
}

exports.updateFoodImage = async (req, res) => {
    res.send("update food Image")
}

exports.deleteFood = async (req, res) => {
    res.send("delete food")
}

exports.addFoodToMenu = async (req, res) => {
    res.send("add Food To Menu")
}