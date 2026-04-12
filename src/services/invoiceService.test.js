import axios from "axios";

jest.mock("axios");
jest.mock("redux-react-session", () => ({
  sessionService: {
    loadSession: jest.fn()
  }
}));

const { sessionService } = require("redux-react-session");
const { SERVER_URL } = require("../constants/server");

// Import after mocks are set up
const { getInvoiceHistoryService } = require("./invoiceService");

describe("getInvoiceHistoryService", () => {
  const mockSession = { access_token: "test-token-123" };

  beforeEach(() => {
    jest.clearAllMocks();
    sessionService.loadSession.mockResolvedValue(mockSession);
  });

  it("calls the API with default pagination params", async () => {
    const mockResponse = {
      data: { data: [], current_page: 1, last_page: 1, per_page: 15, total: 0 }
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await getInvoiceHistoryService();

    expect(axios.get).toHaveBeenCalledWith(
      `${SERVER_URL}/api/invoice/all?page=1&per_page=15`,
      {
        headers: { Authorization: "Bearer test-token-123" }
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("passes page and perPage params to the URL", async () => {
    axios.get.mockResolvedValue({ data: {} });

    await getInvoiceHistoryService(3, 50);

    expect(axios.get).toHaveBeenCalledWith(
      `${SERVER_URL}/api/invoice/all?page=3&per_page=50`,
      expect.any(Object)
    );
  });

  it("includes search param when provided", async () => {
    axios.get.mockResolvedValue({ data: {} });

    await getInvoiceHistoryService(1, 15, "Aprobada");

    expect(axios.get).toHaveBeenCalledWith(
      `${SERVER_URL}/api/invoice/all?page=1&per_page=15&search=Aprobada`,
      expect.any(Object)
    );
  });

  it("encodes special characters in search param", async () => {
    axios.get.mockResolvedValue({ data: {} });

    await getInvoiceHistoryService(1, 15, "test & value");

    const calledUrl = axios.get.mock.calls[0][0];
    expect(calledUrl).toContain("search=test%20%26%20value");
  });

  it("does not append search param when empty string", async () => {
    axios.get.mockResolvedValue({ data: {} });

    await getInvoiceHistoryService(1, 15, "");

    const calledUrl = axios.get.mock.calls[0][0];
    expect(calledUrl).not.toContain("search");
  });
});
