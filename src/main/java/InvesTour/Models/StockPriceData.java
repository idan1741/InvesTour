package InvesTour.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class StockPriceData {
    @JsonProperty("symbol")
    private String symbol;
    @JsonProperty("interval")
    private String interval;
    @JsonProperty("change")
    private double change;
    @JsonProperty("prices")
    private List<StockPricePerTime> prices;

    public StockPriceData(JsonNode jsonNode) {
        this.symbol = jsonNode.path("Meta Data").path("2. Symbol").asText();
        this.interval = jsonNode.path("Meta Data").path("4. Interval").asText();
        this.prices = this.deserializePrices(jsonNode.path("Time Series (" + this.interval + ")"));
        this.change = this.calcChange();
    }

    private List<StockPricePerTime> deserializePrices(JsonNode jsonNode) {
        List<StockPricePerTime> prices = new ArrayList<>();
        Iterator<String> stringIterator = jsonNode.fieldNames();

        while (stringIterator.hasNext()) {
            String date = stringIterator.next();
            prices.add(new StockPricePerTime(date, jsonNode.path(date)));
        }

        return prices;
    }

    private double calcChange() {
        double oldClosePrice = this.prices.get(0).getClose();
        double newClosePrice = this.prices.get(prices.size() - 1).getClose();

        return calculatePercentageChange(oldClosePrice, newClosePrice);
    }

    private double calculatePercentageChange(double oldValue, double newValue) {
        double change = newValue - oldValue;
        return (change / oldValue) * 100.0;
    }
}
