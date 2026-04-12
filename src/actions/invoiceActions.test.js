import * as types from "./index";
import {
  setInvoiceHistoryData,
  setInvoicePagination,
  setInvoiceLoading,
  getInvoiceHistory
} from "./invoiceActions";

jest.mock("../services/invoiceService", () => ({
  getInvoiceHistoryService: jest.fn()
}));

const { getInvoiceHistoryService } = require("../services/invoiceService");

describe("invoiceActions", () => {
  describe("action creators", () => {
    it("setInvoiceHistoryData creates correct action", () => {
      const data = [{ id: 1 }, { id: 2 }];
      expect(setInvoiceHistoryData(data)).toEqual({
        type: types.SET_HISTORY_INVOICE,
        payload: { dataInvoices: data }
      });
    });

    it("setInvoicePagination creates correct action", () => {
      const pagination = {
        currentPage: 1,
        lastPage: 5,
        perPage: 15,
        total: 70
      };
      expect(setInvoicePagination(pagination)).toEqual({
        type: types.SET_INVOICE_PAGINATION,
        payload: { pagination }
      });
    });

    it("setInvoiceLoading creates correct action", () => {
      expect(setInvoiceLoading(true)).toEqual({
        type: types.SET_INVOICE_LOADING,
        payload: { loading: true }
      });
    });
  });

  describe("getInvoiceHistory thunk", () => {
    it("dispatches loading, data, pagination, and loading done", async () => {
      const mockResponse = {
        data: {
          data: [{ id: 1, number: "001" }],
          current_page: 2,
          last_page: 10,
          per_page: 15,
          total: 150
        }
      };
      getInvoiceHistoryService.mockResolvedValue(mockResponse);

      const dispatched = [];
      const dispatch = action => dispatched.push(action);

      const thunk = getInvoiceHistory(2, 15, "test");
      await thunk(dispatch);

      expect(getInvoiceHistoryService).toHaveBeenCalledWith(2, 15, "test");

      expect(dispatched[0]).toEqual({
        type: types.SET_INVOICE_LOADING,
        payload: { loading: true }
      });
      expect(dispatched[1]).toEqual({
        type: types.SET_HISTORY_INVOICE,
        payload: { dataInvoices: [{ id: 1, number: "001" }] }
      });
      expect(dispatched[2]).toEqual({
        type: types.SET_INVOICE_PAGINATION,
        payload: {
          pagination: {
            currentPage: 2,
            lastPage: 10,
            perPage: 15,
            total: 150
          }
        }
      });
      expect(dispatched[3]).toEqual({
        type: types.SET_INVOICE_LOADING,
        payload: { loading: false }
      });
    });

    it("uses defaults when called without arguments", async () => {
      const mockResponse = {
        data: {
          data: [],
          current_page: 1,
          last_page: 1,
          per_page: 15,
          total: 0
        }
      };
      getInvoiceHistoryService.mockResolvedValue(mockResponse);

      const dispatched = [];
      const dispatch = action => dispatched.push(action);

      const thunk = getInvoiceHistory();
      await thunk(dispatch);

      expect(getInvoiceHistoryService).toHaveBeenCalledWith(1, 15, "");
    });

    it("handles undefined response gracefully", async () => {
      getInvoiceHistoryService.mockResolvedValue(undefined);

      const dispatched = [];
      const dispatch = action => dispatched.push(action);

      const thunk = getInvoiceHistory();
      await thunk(dispatch);

      // Should dispatch loading true, then loading false (no data/pagination)
      expect(dispatched).toHaveLength(2);
      expect(dispatched[0].payload.loading).toBe(true);
      expect(dispatched[1].payload.loading).toBe(false);
    });
  });
});
