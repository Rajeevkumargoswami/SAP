jQuery.sap.declare("sap.ui.comp.sample.smartfilterbar.Component");
jQuery.sap.require("sap.ui.fl.FakeLrepConnectorLocalStorage");
sap.ui.core.UIComponent.extend("sap.ui.comp.sample.smartfilterbar.Component", {

	metadata: {
		rootView: {
		 "viewName": "sap.ui.comp.sample.smartfilterbar.SmartFilterBar",
		   "type": "XML",
		  "async": true
		},
		dependencies: {
			libs: [ "sap.m", "sap.ui.comp" ]
		},
		config: {
			sample: {
				stretch: true,
				files: [
					"SmartFilterBar.view.xml",
					"SmartFilterBar.controller.js",
					"mockserver/LineItemsSet.json",
					"mockserver/metadata.xml",
					"mockserver/VL_SH_H_T001.json"
				]
			}
		}
	},
	constructor: function () {
		sap.ui.core.UIComponent.prototype.constructor.apply(this, arguments);
		sap.ui.fl.FakeLrepConnectorLocalStorage.enableFakeConnector();
	},

	destroy: function() {
		sap.ui.fl.FakeLrepConnectorLocalStorage.disableFakeConnector();
		sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
	}
});
