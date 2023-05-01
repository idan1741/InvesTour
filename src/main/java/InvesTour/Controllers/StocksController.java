package InvesTour.Controllers;

import InvesTour.Models.Stock;
import InvesTour.Services.StocksService;
import InvesTour.Services.UsersService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/stocks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/")
public class StocksController {
    private final UsersService service;

    private final StocksService stocksService;

    @PostMapping("/user/add")
//    public ResponseEntity<String> addStockToUser(@RequestBody JsonNode jsonBody) throws Exception {
    public String addStockToUser(@RequestBody JsonNode jsonBody) throws Exception {
//        String userEmail = jsonBody.get("userEmail").asText();
//        long stockId = jsonBody.get("stockId").asLong();
//
//        this.service.addStockToUser(userEmail, stockId);
//
//        String userStockInfo = "User ID: " + userEmail + ", Stock ID: " + stockId;

        return  "stock deleted";
//        return ResponseEntity.ok(userStockInfo);
    }

    @PostMapping(value = "/user/delete")
//    public ResponseEntity<String> deleteStockFromUser(@RequestBody JsonNode jsonBody) throws Exception {
    public String deleteStockFromUser(@RequestBody JsonNode jsonBody) throws Exception {
//        String userEmail = jsonBody.get("userEmail").asText();
//        long stockId = jsonBody.get("stockId").asLong();
//
//        this.service.deleteStockForUser(userEmail, stockId);
//
//        String userStockInfo = "User ID: " + userEmail + ", Stock ID: " + stockId;
//        return ResponseEntity.ok(userStockInfo);

        return  "stock deleted";
    }

    @DeleteMapping(value = "/{stockId}/user/{userId}")
    public void deleteStockToUser(@PathVariable("stockId") String stockName, @PathVariable("userId") Long id) {

    }

    @GetMapping
    public Stock[] getAllStocks() {
        Stock[] StockList = new Stock[12];
        Stock a = new Stock(111,"Tesla","TSLA");
        Stock b = new Stock(222,"s&p 500","SPY");
        Stock c = new Stock(333,"wow, Inc","adwafs");
        Stock d = new Stock(444,"damn","3453ty");
        Stock e = new Stock(555,"lol","svd");
        Stock f = new Stock(6,"Tesla","TSLA");
        Stock g = new Stock(7,"s&p 500","SPY");
        Stock h = new Stock(8,"wow, Inc","adwafs");
        Stock i = new Stock(9,"damn","3453ty");
        Stock j = new Stock(10,"lol","svd");
        Stock k = new Stock(11,"yoyo","878787");
        Stock l = new Stock(12,"fsdg","podu");
        StockList[0] = a;
        StockList[1] = b;
        StockList[2] = c;
        StockList[3] = d;
        StockList[4] = e;
        StockList[5] = f;
        StockList[6] = g;
        StockList[7] = h;
        StockList[8] = i;
        StockList[9] = j;
        StockList[10] = k;
        StockList[11] = l;

        return  StockList;
//        return ResponseEntity.ok(this.stocksService.getAllStocks());
    }

    @GetMapping(value = "/{userId}")
    public Stock[] getAllUserStocks() {
        Stock[] StockList = new Stock[5];
        Stock a = new Stock(1,"Tesla","TSLA");
        Stock b = new Stock(2,"s&p 500","SPY");
        Stock c = new Stock(3,"wow, Inc","adwafs");
        Stock d = new Stock(4,"damn","3453ty");
        Stock e = new Stock(5,"lol","svd");
        StockList[0] = a;
        StockList[1] = b;
        StockList[2] = c;
        StockList[3] = d;
        StockList[4] = e;

        return StockList;
    }
}
