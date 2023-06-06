package InvesTour.Controllers;

import InvesTour.Models.Stock;
import InvesTour.Models.StockPriceData;
import InvesTour.Services.StocksService;
import InvesTour.Services.UsersService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/stocks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/")
public class StocksController {
    private final UsersService service;

    private final StocksService stocksService;

    @PostMapping("/user/add")
    public Map<String, String> addStockToUser(@RequestBody JsonNode jsonBody) throws Exception {
        String userEmail = jsonBody.get("userEmail").asText();
        long stockId = jsonBody.get("stockId").asLong();

        this.service.addStockToUser(userEmail, stockId);

        String userStockInfo = "User ID: " + userEmail + ", Stock ID: " + stockId;

        Map<String, String> userMap = Map.of("userStockInfo", userStockInfo);
        return userMap;
    }

    @PostMapping(value = "/user/delete")
    public Map<String, String> deleteStockFromUser(@RequestBody JsonNode jsonBody) throws Exception {
        String userEmail = jsonBody.get("userEmail").asText();
        long stockId = jsonBody.get("stockId").asLong();

        this.service.deleteStockForUser(userEmail, stockId);

        String userStockInfo = "User ID: " + userEmail + ", Stock ID: " + stockId;

        Map<String, String> userMap = Map.of("userStockInfo", userStockInfo);
        return userMap;
    }

    @DeleteMapping(value = "/{stockId}/user/{userId}")
    public void deleteStockToUser(@PathVariable("stockId") String stockName, @PathVariable("userId") Long id) {

    }

    @GetMapping(value = "/{userEmail}")
    public ResponseEntity<List<Stock>> getStocksByUser(@PathVariable("userEmail") String userEmail) {
        return ResponseEntity.ok().body(this.stocksService.getAllStocksByUser(userEmail));
    }

    @GetMapping(value = "/data/{symbol}/{timeInterval}")
    public ResponseEntity<StockPriceData> getStockRealTimeData(@PathVariable("symbol") String symbol, @PathVariable("timeInterval") String timeInterval) {
        return ResponseEntity.ok().body(this.stocksService.getStockRealTimeData(symbol,timeInterval));
    }

    @GetMapping(value = "/price/{symbol}")
    public ResponseEntity<Double> getStockRealTimeData(@PathVariable("symbol") String symbol) {
        return ResponseEntity.ok().body(this.stocksService.getCurrentPrice(symbol));
    }

    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        return ResponseEntity.ok(this.stocksService.getAllStocks());
    }
}
