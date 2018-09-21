sap.ui.controller("sap.ui.comp.sample.smartfilterbar.SmartFilterBar", {
	onInit: function() {
		var oModel, oView;
		jQuery.sap.require("sap.ui.core.util.MockServer");
		var oMockServer = new sap.ui.core.util.MockServer({
			rootUri: "/foo/"
		});
		this._oMockServer = oMockServer;
		var sMockdataUrl = jQuery.sap.getResourcePath("sap/ui/comp/sample/smartfilterbar/mockserver");
		var sMetadataUrl = sMockdataUrl + "/metadata.xml";
		oMockServer.simulate(sMetadataUrl, {
			sMockdataBaseUrl: sMockdataUrl,
			aEntitySetsNames: [
				"LineItemsSet", "VL_SH_H_T001"
			]
		});
		oMockServer.start();
		oModel = new sap.ui.model.odata.ODataModel("/foo", true);
		oModel.setCountSupported(false);
		oView = this.getView();
		oView.setModel(oModel);

		var oFilterBar = sap.ui.getCore().byId(oView.getId() + "--smartFilterBar");
		if (oFilterBar) {
			var that = this;
			oFilterBar.attachFilterChange(function(oEvent) {
				// that.onFilterChanged();
			});

			var oBasicSearchField = new sap.m.SearchField();
			oBasicSearchField.attachLiveChange(function(oEvent) {
				var oFB = this.getView().byId("smartFilterBar");
				oFB.fireFilterChange(oEvent);
			}.bind(this));

			oFilterBar.setBasicSearch(oBasicSearchField);

		}
	},
	onExit: function() {
		this._oMockServer.stop();
	},
	toggleUpdateMode: function() {
		var oSmartFilterbar = this.getView().byId("smartFilterBar");
		var oButton = this.getView().byId("toggleUpdateMode");

		if (!oSmartFilterbar || !oButton) {
			return;
		}

		var bLiveMode = oSmartFilterbar.getLiveMode();
		if (bLiveMode) {
			oButton.setText("Change to 'LiveMode'");
		} else {
			oButton.setText("Change to 'ManualMode'");
		}

		oSmartFilterbar.setLiveMode(!bLiveMode);
	},

	_setButtonText: function() {

		var oSmartFilterbar = this.getView().byId("smartFilterBar");
		var oButton = this.getView().byId("toggleUpdateMode");

		if (!oSmartFilterbar || !oButton) {
			return;
		}

		var bLiveMode = oSmartFilterbar.getLiveMode();
		if (bLiveMode) {
			oButton.setText("Change to 'LiveMode'");
		} else {
			oButton.setText("Change to 'ManualMode'");
		}

	},

	onAfterVariantLoad: function(oEvent) {
		var oSmartFilterbar = this.getView().byId("smartFilterBar");

		if (oSmartFilterbar) {

			var oData = oSmartFilterbar.getFilterData();
			var oCustomFieldData = oData["_CUSTOM"];
			if (oCustomFieldData) {

				var oCtrl = oSmartFilterbar.determineControlByName("MyOwnFilterField");

				if (oCtrl) {
					oCtrl.setSelectedKey(oCustomFieldData.MyOwnFilterField);
				}
			}
		}
	},

	onBeforeVariantSave: function(oEvent) {
		if (oEvent.getParameter("context") === "STANDARD") {
			this._updateCustomFilter();
		}
	},

	onBeforeVariantFetch: function(oEvent) {
		this._updateCustomFilter();
	},

	_updateCustomFilter: function() {
		var oSmartFilterbar = this.getView().byId("smartFilterBar");

		if (oSmartFilterbar) {

			var oCtrl = oSmartFilterbar.determineControlByName("MyOwnFilterField");

			if (oCtrl) {
				oSmartFilterbar.setFilterData({
					_CUSTOM: {
						MyOwnFilterField: oCtrl.getSelectedKey()
					}
				});
			}
		}
	}
});
