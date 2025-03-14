import { useEffect } from "react";
import { render, waitFor } from "@testing-library/react";

const fetchApi = jest.fn();

const TestComponent = () => {
  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const data = await fetchApi("https://api.vercel.app/blog");

        if (data) {
          console.log("Fetched data:", data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFoodList();
  }, []);

  return <div>Test Component</div>;
};

describe("useEffect API call", () => {
  it("should call fetchApi and log data on success", async () => {
    const mockData = { products: [{ id: 1, name: "Pizza" }] };
    fetchApi.mockResolvedValue(mockData);
    console.log = jest.fn();

    render(<TestComponent />);

    await waitFor(() => {
      expect(fetchApi).toHaveBeenCalledWith(
        "https://nextjs-server-rho.vercel.app/api/products/getAllProducts/route"
      );
      expect(console.log).toHaveBeenCalledWith("Fetched data:", mockData);
    });
  });

  it("should log an error if fetchApi fails", async () => {
    const mockError = new Error("Network Error");
    fetchApi.mockRejectedValue(mockError);
    console.error = jest.fn();

    render(<TestComponent />);

    await waitFor(() => {
      expect(fetchApi).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching data:",
        mockError
      );
    });
  });
});
