import Phaser from "phaser";
import WebFontLoader from "webfontloader";

class WebFontFile extends Phaser.Loader.File {
    constructor(loader, fontNames, service = "google") {
        super(loader, {
            type: "webfont",
            key: fontNames.toString()
        });

        this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames];
        this.service = service;
    };

    load() {
        const config = {
            active: () => {
                this.loader.nextFile(this, true);
            }
        };

        switch (this.service) {
            case "google":
                config["google"] = {families: this.fontNames};
                break;
            default:
                throw new Error("unsupported font service");
        };

        WebFontLoader.load(config);
    };
};

export default WebFontFile;