sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/BindingMode"
],
    function (Controller, Fragment, JSONModel, BindingMode) {
        "use strict";

        return Controller.extend("mentoria.fiori.ka.zkaui5242icsf.controller.View1", {

            onInit: function () {
                var oModelJson = new JSONModel({ 
                    name: 'João',
                    showSecondName: true
                })
                this.getView().setModel(oModelJson, "model1");

                var oModelJson2 = new JSONModel({ 
                    name: 'Pedro'
                })
                this.getView().setModel(oModelJson2, "model2");

                var oModelJson3 = new JSONModel();
                oModelJson3.loadData("model/Products.json")
                this.getView().setModel(oModelJson3, "model3");
                
                var oModelJson4 = new JSONModel();
                oModelJson4.loadData("model/Employees.json")
                this.getView().setModel(oModelJson4, "model4");

            },

            formatAlertStock: function (units) {
                if(units > 0){
                    return ""
                }else{
                    return "Disponível em breve";
                }
            },

            onDataComboBoxChange: function (oEvent) {
                var oItem = oEvent.getParameter("selectedItem")
                var sPath = oItem.getBindingContext("model4").getPath();

                var oList = this.byId("listEmployees");
                oList.bindElement({path: sPath, model: "model4"});
            },

            onOpenDialog: function () {

                var oView = this.getView(),
                    oDialogKids = this.getView().byId("dialogKids");
                if (!oDialogKids) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "mentoria.fiori.ka.zkaui5242icsf.view.DialogKids",
                        type: "XML",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    })
                } else {
                    oDialogKids.open();
                }

            },
            onClosePopup: function () {
                this.getView().byId("dialogKids").close();
            },

        });
    });
