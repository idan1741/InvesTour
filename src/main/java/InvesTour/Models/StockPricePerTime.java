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
    @JsonProperty("value")
    private double price;

    private static final ZoneId ZONE_ID = ZoneId.of("Asia/Jerusalem");

    public StockPricePerTime(String date, JsonNode jsonNode) {
        this.time = ZonedDateTime.of(LocalDateTime.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), ZONE_ID);
        this.price = jsonNode.path("1. open").asDouble();
    }
}
