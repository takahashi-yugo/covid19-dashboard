import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import dataJson from "./dataDaily.json";

const API_URL = "https://api.covid19api.com/total/country";

type APIDATA = typeof dataJson;

type covidState = {
  data: APIDATA;
  country: string;
};

const initialState: covidState = {
  data: [
    {
      Country: "Japan",
      CountryCode: "",
      Province: "",
      City: "",
      CityCode: "",
      Lat: "0",
      Lon: "0",
      Confirmed: 0,
      Deaths: 0,
      Recovered: 0,
      Active: 0,
      Date: "2020-01-22T00:00:00Z",
    },
  ],
  country: "",
};

export const fetchAsyncGetDaily = createAsyncThunk(
  "covid/get",
  async (country: string) => {
    const { data } = await axios.get<APIDATA>(`${API_URL}/${country}`);
    return { data: data, country: country };
  }
);

const covidSlice = createSlice({
  name: "covid",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        country: action.payload.country,
      };
    });
  },
});

export const selectDaily = (state: RootState) => state.covid.data;
export const selectCountry = (state: RootState) => state.covid.country;

export default covidSlice.reducer;
