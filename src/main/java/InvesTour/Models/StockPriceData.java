package InvesTour.Models;

import InvesTour.utils.Json;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class StockPriceData {
    @JsonProperty("symbol")
    String symbol;
    @JsonProperty("interval")
    String interval;
    @JsonProperty("prices")
    List<StockPricePerTime> prices;

    public StockPriceData(JsonNode jsonNode) {
        this.symbol = jsonNode.path("Meta Data").path("2. Symbol").asText();
        this.interval = jsonNode.path("Meta Data").path("4. Interval").asText();
        prices = this.deserializePrices(jsonNode.path("Time Series ("+this.interval+")"));
    }

    private List<StockPricePerTime> deserializePrices(JsonNode jsonNode){
        List<StockPricePerTime> prices = new ArrayList<>();
        Iterator<String> stringIterator = jsonNode.fieldNames();
        while (stringIterator.hasNext()){
            String date = stringIterator.next();
            prices.add(new StockPricePerTime(date,jsonNode.path(date)));
        }
        return prices;
    }
}
