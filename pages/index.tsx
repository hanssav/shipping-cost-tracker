/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import styled from "styled-components";
import Select from "@/components/Select";
import Header from "@/components/Header";

const HomeContainer = styled.div`
  padding: 20px;
  width: 60%;
  margin: 0 auto;
`;

interface City {
  city_id: string;
  city_name: string;
  type: string;
}

const Home = () => {
  const [origin, setOrigin] = useState("");
  const [city, setCity] = useState("");
  const [weight, setWeight] = useState(1000);
  const [courier, setCourier] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState("");

  const loadCities = async () => {
    setError("");

    try {
      const { data } = await axios.get("/api/loadCities");
      setCities(data.rajaongkir.results);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    loadCities();
  }, []);

  const fetchShippingCost = async () => {
    setLoading(true);
    setResults(null);
    try {
      const response = await axios.post("/api/shippingCost", {
        origin,
        destination: city,
        weight,
        courier,
      });
      setResults(response.data.rajaongkir.results);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <HomeContainer>
        <h1 className="text-2xl font-bold">Shipping Cost Checker</h1>
        <Select
          id="asal-pengiriman"
          label="Asal Pengiriman"
          value={origin}
          onChange={setOrigin}
          options={cities.map((city) => ({
            value: city.city_id,
            label: `${city.type} ${city.city_name}`,
          }))}
        />
        <Select
          id="tujuan-pengiriman"
          label="Pilih Tujuan Pengiriman"
          value={city}
          onChange={setCity}
          options={cities.map((city) => ({
            value: city.city_id,
            label: `${city.type} ${city.city_name}`,
          }))}
        />
        <Input
          label="Weight (grams)"
          type="number"
          value={String(weight)}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
        <Select
          id="courier-select"
          label="Choose Courier"
          value={courier}
          onChange={setCourier}
          options={[
            { value: "jne", label: "JNE" },
            { value: "pos", label: "POS" },
            { value: "tiki", label: "TIKI" },
          ]}
        />
        <Button
          label="Check Cost"
          onClick={fetchShippingCost}
          disabled={!city || !origin || !courier}
        />
        {loading && <p>Loading...</p>}
        {results && (
          <Card title="Shipping Results">
            {results[0].costs.length > 0 ? (
              results.map((result: any) => (
                <div key={result.code}>
                  <h3>{result.name}</h3>
                  <ul>
                    {result.costs.map((cost: any) => (
                      <li key={cost.service}>
                        <p>
                          <strong>Service:</strong> {cost.description}
                        </p>
                        <p>
                          <strong>Estimated Delivery Time:</strong>{" "}
                          {cost.cost[0].etd} days
                        </p>
                        <p>
                          <strong>Cost:</strong> {cost.cost[0].value} IDR
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>Tidak ada pengiriman tersedia</p>
            )}
          </Card>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </HomeContainer>
    </>
  );
};

export default Home;
