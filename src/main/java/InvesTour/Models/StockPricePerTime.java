package InvesTour.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class StockPricePerTime {
    @JsonProperty("time")
    private ZonedDateTime time;
    @JsonProperty("open")
    private double open;
    @JsonProperty("high")
    private double high;
    @JsonProperty("low")
    private double low;
    @JsonProperty("close")
    private double close;
    @JsonProperty("volume")
    private double volume;

    private static final ZoneId ZONE_ID = ZoneId.of("Asia/Jerusalem");

    public StockPricePerTime(String date, JsonNode jsonNode) {
        this.time = ZonedDateTime.of(LocalDateTime.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), ZONE_ID);
        this.open = jsonNode.path("1. open").asDouble();
        this.high = jsonNode.path("2. high").asDouble();
        this.low = jsonNode.path("3. low").asDouble();
        this.close = jsonNode.path("4. close").asDouble();
        this.volume = jsonNode.path("5. volume").asDouble();
    }
}
