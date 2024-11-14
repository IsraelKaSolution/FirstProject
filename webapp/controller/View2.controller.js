sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageBox"
	],
	function (Controller,
		MessageBox) {
		"use strict";

		return Controller.extend("mentoria.fiori.ka.zkaui5242icsf.controller.View2", {
			onInit: function () {

				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.getRoute("Rota2").attachMatched(this.onRouteMatche)
			},

			onRouteMatche: function (oEvent) {
				var oArg = oEvent.getParameter('arguments'),
					id = oArg.id;
				MessageBox.show(id);
			}

		});
	}
);
