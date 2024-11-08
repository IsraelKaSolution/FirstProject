sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    function (Controller, Fragment, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("mentoria.fiori.ka.zkaui5242icsf.controller.View1", {

            onInit: function () {
                //Criando model direto com objeto JavaScript
                var oModelJson = new JSONModel({
                    name: 'João',
                    showSecondName: true
                })
                this.getView().setModel(oModelJson, "model1");

                var oModelJson2 = new JSONModel({
                    name: 'Pedro'
                })
                this.getView().setModel(oModelJson2, "model2");

                //Criando model
                var oModelJson3 = new JSONModel();
                //Carregando arquivo JSON
                oModelJson3.loadData("model/Products.json")
                //Vinculando model na View 
                this.getView().setModel(oModelJson3, "model3");

                var oModelJson4 = new JSONModel();
                oModelJson4.loadData("model/Employees.json")
                this.getView().setModel(oModelJson4, "model4");

                var oBubdle = this.getOwnerComponent().getModel("i18n").getResourceBundle(),
                    msg = oBubdle.getText("msgInit", ["com", "sucesso"]);

                MessageToast.show(msg);

            },

            onChangeLine: function (oEvent) {
                var value = oEvent.getParameter("value"),
                    oModel = this.getOwnerComponent().getModel("UX_TRAVEL_SRV"),
                    oInput = this.byId("carridName");

                // Chave: /UX_C_Carrier_TP('AA')
                oInput.setBusy(true);
                oModel.read("/UX_C_Carrier_TP('" + value + "')", {
                    success: function (oData) {
                        MessageToast.show("OK")
                        oInput.setValue(oData.Carrname);
                        oInput.setBusy(false);
                    },
                    error: function (oError) {
                        MessageToast.show("ERRO!")
                    }
                });

            },

            formatAlertStock: function (units) {
                if (units > 0) {
                    return ""
                } else {
                    return "Disponível em breve";
                }
            },

            onDataComboBoxChange: function (oEvent) {
                //Pegando item selecionado no combobox
                var oItem = oEvent.getParameter("selectedItem")

                //Pegando o contexto da vinculação e depois o caminho dele (path)
                //Preciso colocar o nome do model quando eu dou um nome para ele na vinculação do onInit
                var sPath = oItem.getBindingContext("model4").getPath();

                //Obtendo eferencia da lista
                var oList = this.byId("listEmployees");

                //Vinculando toda a lista ao caminho/contexto relativo ao item do combobox selecionado
                //Preciso colocar o nome do model quando eu dou um nome para ele na vinculação do onInit
                oList.bindElement({ path: sPath, model: "model4" });
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
