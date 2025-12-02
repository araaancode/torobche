// @ description =>> get all templates
// @ http verb =>> GET
// @ access =>> public
// @ route =>> /api/templates
exports.templates = async () => {
    res.send("templates")
}

// @ description =>> get single template
// @ http verb =>> GET
// @ access =>> public
// @ route =>> /api/templates/:id
exports.template = async () => {
    res.send("template")
}


// @ description =>> create template
// @ http verb =>> POST
// @ access =>> private
// @ route =>> /api/templates
exports.createTemplate = async () => {
    res.send("createTemplate")
}

// @ description =>> update template
// @ http verb =>> UPDATE
// @ access =>> private (admin)
// @ route =>> /api/templates/:id/update-template
exports.updateTemplate = async () => {
    res.send("updateTemplate")
}

// @ description =>> update template image
// @ http verb =>> UPDATE
// @ access =>> private (admin)
// @ route =>> /api/templates/:id/update-template-image
exports.updateTemplateImage = async () => {
    res.send("updateTemplateImage")
}

// @ description =>> update template colors
// @ http verb =>> UPDATE
// @ access =>> private (admin)
// @ route =>> /api/templates/:id/update-template-colors
exports.updateTemplateColors = async () => {
    res.send("updateTemplateColors")
}

// @ description =>> delete template
// @ http verb =>> DELETE
// @ access =>> private (admin)
// @ route =>> /api/templates/:id
exports.deleteTemplate = async () => {
    res.send("deleteTemplate")
}