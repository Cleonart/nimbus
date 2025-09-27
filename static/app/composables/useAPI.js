import axios from "axios";

import base from "./APIOdoo/base";
import useAccountTax from "./APIOdoo/models/usrAccountTax";
import useIrModuleModule from "./APIOdoo/models/useIrModuleModule";
import useIrModuleInstalled from "./APIOdoo/models/useIrModuleInstalled";

// Import all models data
import useCustomer from "./APIOdoo/models/useCustomer";
import useResPartner from "./APIOdoo/models/useResPartner";
import useHREmployee from "./APIOdoo/models/useHREmployee";
import useHRPayslip from "./APIOdoo/models/useHRPayslip";
import useHRPayslipInput from "./APIOdoo/models/useHRPayslipInput";
import useHRJobPosition from "./APIOdoo/models/useHRJobPosition";
import useDashboard from "./APIOdoo/models/useDashboard";
import usePos from "./APIOdoo/models/usePos";
import usePosSession from "./APIOdoo/models/usePosSession";
import usePosPayment from "./APIOdoo/models/usePosPayment";
import usePosLine from "./APIOdoo/models/usePosLine";
import useProduct from "./APIOdoo/models/useProduct";
import useProductProduct from "./APIOdoo/models/useProductProduct";
import useReport from "./APIOdoo/models/useReport";
import useResUsers from "./APIOdoo/models/useResUsers";
import useResUsersRoles from "./APIOdoo/models/useResUsersRoles";
import useResUsersRolesAccess from "./APIOdoo/models/useResUsersRolesAccess";
import useUsers from "./APIOdoo/models/useUsers";
import useStockLocation from "./APIOdoo/models/useStockLocation";
import useStockArrival from "./APIOdoo/models/useStockArrival";
import useStockMove from "./APIOdoo/models/useStockMove";
import useStockPicking from "./APIOdoo/models/useStockPicking";
import useStockQuant from "./APIOdoo/models/useStockQuant";
import useStockShipment from "./APIOdoo/models/useStockShipment";
import useStockTransfer from "./APIOdoo/models/useStockTransfer";
import useSupplier from "./APIOdoo/models/useSupplier";
import useUnitBase from "./APIOdoo/models/useUnitBase";
import useUnitBaseRelated from "./APIOdoo/models/useUnitBaseRelated";
import useWarehouse from "./APIOdoo/models/useWarehouse";
import useAccountAccount from "./APIOdoo/models/useAccountAccount";
import useAccountJournal from "./APIOdoo/models/useAccountJournal";
import useAccountMove from "./APIOdoo/models/useAccountMove";
import useAccountMoveLine from "./APIOdoo/models/useAccountMoveLine";
import useAccountPayable from "./APIOdoo/models/useAccountPayable";
import useAccountPayment from "./APIOdoo/models/useAccountPayment";
import useAccountReceivable from "./APIOdoo/models/useAccountReceivable";
import useAccountReceivableLine from "./APIOdoo/models/useAccountReceivableLine";
import useAccountSetupBankManualConfig from "./APIOdoo/models/useAccountSetupBankManualConfig";
import useAccountBankAccount from "./APIOdoo/models/useAccountBankAccount";
import useAccountLoan from "./APIOdoo/models/useAccountLoan";
import useSalesOrder from "./APIOdoo/models/useSalesOrder";
import useSalesVoucher from "./APIOdoo/models/useSalesVoucher";
import useCompany from "./APIOdoo/models/useCompany";
import useCountry from "./APIOdoo/models/useCountry";
import useCountryState from "./APIOdoo/models/useState";
import useStockProduction from "./APIOdoo/models/useStockProduction";
import useStockProductionLine from "./APIOdoo/models/useStockProductionLine";
import useStockProductionMaterial from "./APIOdoo/models/useStockProductionMaterial";
import useRestaurantKitchen from "./APIOdoo/models/useRestaurantKitchen";
import useRestaurantKitchenOrder from "./APIOdoo/models/useRestaurantKitchenOrder";

// -- Egg Farm
import useProductionEggFarm from "./APIOdoo/models/useProductionEggFarm";
import useIncubationEggFarm from "./APIOdoo/models/useIncubationEggFarm";
import useSortFarmEgg from "./APIOdoo/models/useSortFarmEgg";
import useInventoryAdjustment from "./APIOdoo/models/useInventoryAdjustment";
import useUomUom from "./APIOdoo/models/useUomUom";
import useAccountPaymentMethodLine from "./APIOdoo/models/useAccountPaymentMethodLine";
import useResBank from "./APIOdoo/models/useResBank";
import useIotDevice from "./APIOdoo/models/useIotDevice";
import useSessionEggFarm from "./APIOdoo/models/useSessionEggFarm";
import useSalesLoyaltyProgram from "./APIOdoo/models/useSalesLoyaltyProgram";
import useSalesLoyaltyRule from "./APIOdoo/models/useSalesLoyaltyRule";
import useSalesLoyaltyReward from "./APIOdoo/models/useSalesLoyaltyReward";

// -- Water Billing
import useWaterBillingMeterReading from "./APIOdoo/models/useWaterBillingReading";

const DEFAULT_BASE_URL = "http://localhost:8069";

/**
 * HTTP Axios Instance
 * @param {*} BASE_URL
 * @param {*} HEADERS
 * @returns
 */
const httpInstance = (
  BASE_URL,
  SESSION_ID = undefined,
  DB_NAME = undefined,
) => {
  const headers = {};
  if (SESSION_ID && DB_NAME) {
    headers["Authorization"] = "Bearer " + SESSION_ID + " " + DB_NAME;
  } else if (SESSION_ID) {
    headers["Authorization"] = "Bearer " + SESSION_ID;
  }

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

const generateBaseURL = ({ protocol, hostname }) => {
  return `${protocol}//${hostname}`;
};

export default function () {
  const runtimeConfig = useRuntimeConfig();
  const url = useRequestURL();
  const SESSION_ID = useCookie("token");
  const DB_NAME = useCookie("dbname");
  const BASE_URL = generateBaseURL({
    env: runtimeConfig.public.env,
    protocol: url.protocol,
    hostname: runtimeConfig.public.hostname || url.hostname,
    baseURL: runtimeConfig.public.baseURL,
  });

  const http = httpInstance(BASE_URL, SESSION_ID.value, DB_NAME.value);

  //* Construct the base of models
  const baseModels = {
    axios: axios,
    BASE_URL: BASE_URL,
    HTTP: http,
    useAuth: new base.Auth(http),
  };

  //* Construct the list of models
  const modelsList = {
    useAccountTax: new useAccountTax(http),
    useResBank: new useResBank(http),
    useIrModuleModule: new useIrModuleModule(http),
    useIrModuleInstalled: new useIrModuleInstalled(http),
    useResPartner: new useResPartner(http),
    useCustomer: new useCustomer(http),
    useHREmployee: new useHREmployee(http),
    useHRPayslip: new useHRPayslip(http),
    useHRPayslipInput: new useHRPayslipInput(http),
    useHRJobPosition: new useHRJobPosition(http),
    useUsers: new useUsers(http),
    useResUsers: new useResUsers(http),
    useResUsersRoles: new useResUsersRoles(http),
    useResUsersRolesAccess: new useResUsersRolesAccess(http),
    useAccountAccount: new useAccountAccount(http),
    useAccountJournal: new useAccountJournal(http),
    useAccountMove: new useAccountMove(http),
    useAccountMoveLine: new useAccountMoveLine(http),
    useAccountPayable: new useAccountPayable(http),
    useAccountPayment: new useAccountPayment(http),
    useAccountPaymentMethodLine: new useAccountPaymentMethodLine(http),
    useAccountReceivable: new useAccountReceivable(http),
    useAccountReceivableLine: new useAccountReceivableLine(http),
    useAccountBankAccount: new useAccountBankAccount(http),
    useAccountSetupBankManualConfig: new useAccountSetupBankManualConfig(http),
    useSalesOrder: new useSalesOrder(http),
    useSalesVoucher: new useSalesVoucher(http),
    useSalesLoyaltyProgram: new useSalesLoyaltyProgram(http),
    useSalesLoyaltyRule: new useSalesLoyaltyRule(http),
    useSalesLoyaltyReward: new useSalesLoyaltyReward(http),
    useAccountLoan: new useAccountLoan(http),
    useCompany: new useCompany(http),
    useCountry: new useCountry(http),
    useDashboard: new useDashboard(http),
    usePos: new usePos(http),
    usePosSession: new usePosSession(http),
    usePosLine: new usePosLine(http),
    usePosPayment: new usePosPayment(http),
    useProduct: new useProduct(http),
    useProductProduct: new useProductProduct(http),
    useReport: new useReport(http),
    useState: new useCountryState(http),
    useStockLocation: new useStockLocation(http),
    useInventoryAdjustment: new useInventoryAdjustment(http),
    useStockArrival: new useStockArrival(http),
    useStockMove: new useStockMove(http),
    useStockPicking: new useStockPicking(http),
    useUomUom: new useUomUom(http),
    useStockQuant: new useStockQuant(http),
    useStockShipment: new useStockShipment(http),
    useStockTransfer: new useStockTransfer(http),
    useSupplier: new useSupplier(http),
    useUnitBase: new useUnitBase(http),
    useUnitBaseRelated: new useUnitBaseRelated(http),
    useWarehouse: new useWarehouse(http),
    useStockProduction: new useStockProduction(http),
    useStockProductionLine: new useStockProductionLine(http),
    useStockProductionMaterial: new useStockProductionMaterial(http),
    useSessionEggFarm: new useSessionEggFarm(http),
    useProductionEggFarm: new useProductionEggFarm(http),
    useSortEggFarm: new useSortFarmEgg(http),
    useRestaurantKitchen: new useRestaurantKitchen(http),
    useRestaurantKitchenOrder: new useRestaurantKitchenOrder(http),
    useIotDevice: new useIotDevice(http),
    useWaterBillingMeterReading: new useWaterBillingMeterReading(http),
    useIncubationEggFarm: new useIncubationEggFarm(http),
  };

  //* Return the revamp models
  return {
    ...baseModels,
    ...modelsList,
  };
}
