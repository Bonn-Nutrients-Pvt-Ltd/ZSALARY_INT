import MessageToast from "sap/m/MessageToast";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

/**
 * @namespace zsalarypending.controller
 */
export default class Grid extends Controller {

    public oDataModel: ODataModel;

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.oDataModel = new ODataModel("/sap/opu/odata/sap/ZUI_SALINT/", {
            defaultCountMode: "None"
        });
    }

    public onClickDelete() {
        let selectedData = (this.byId("RespTable") as any).getSelectedItems(),
            that = this;
        BusyIndicator.show();

        this.oDataModel.setDeferredGroups(["deleteItems"]);
        for (let index = 0; index < selectedData.length; index++) {
            const element = selectedData[index].getBindingContext()?.getObject() || {};

            if (!element) continue;

            this.oDataModel.create("/delete", {}, {
                urlParameters: {
                    "Plant": `'${element.Plant}'`,
                    "EmployeeCode": `'${element.EmployeeCode}'`,
                    "DueDate": `'${element.DueDate}'`,
                },
                headers: {
                    "If-Match": "*"
                },
                success: function () {
                    (that.byId("_IDGenSmartTable") as any).rebindTable(true);
                    BusyIndicator.hide();
                }

            })

        }

    }

    
    public onClickValidate() {
        let selectedData = (this.byId("RespTable") as any).getSelectedItems(),
            that = this;
        BusyIndicator.show();

        this.oDataModel.setDeferredGroups(["deleteItems"]);
        for (let index = 0; index < selectedData.length; index++) {
            const element = selectedData[index].getBindingContext()?.getObject() || {};

            if (!element) continue;

            this.oDataModel.create("/validate", {}, {
                urlParameters: {
                    "Plant": `'${element.Plant}'`,
                    "EmployeeCode": `'${element.EmployeeCode}'`,
                    "DueDate": `'${element.DueDate}'`,
                },
                headers: {
                    "If-Match": "*"
                },
                success: function () {
                    (that.byId("_IDGenSmartTable") as any).rebindTable(true);
                    BusyIndicator.hide();
                }

            })

        }

    }

    public onClickPost() {
        let selectedData = (this.byId("RespTable") as any).getSelectedItems(),
            that = this;
        let data = selectedData
            .map((element: any) => {
                let data1 = element.getBindingContext()?.getObject() || {};
                return {
                    "Plant": data1.Plant,
                    "EmployeeCode": data1.EmployeeCode,
                    "DueDate": data1.DueDate,
                }
            })
        BusyIndicator.show();

        $.ajax({
            url: '/sap/bc/http/sap/ZHTTP_SALARYPOST',
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
                MessageToast.show(response);
                (that.byId("_IDGenSmartTable") as any).rebindTable(true);
                BusyIndicator.hide();
            },
            error: function (error) {
                MessageToast.show("Posting failed: " + (error.responseText || "Unknown error"));
                BusyIndicator.hide();
            }
        });

    }

}