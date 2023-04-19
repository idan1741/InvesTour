package InvesTour.Controllers;

import InvesTour.Services.StocksService;
import InvesTour.Services.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/stocks")
@AllArgsConstructor
public class StocksController {

    @Autowired
    private final UsersService service;

    @PostMapping(value = "/user")
    public ResponseEntity<String> addStockToUser(@PathVariable String userEmail, @PathVariable String stockId) throws Exception {
        this.service.addStockToUser(userEmail,stockId);
        String userStockInfo = "User ID: " + userEmail + ", Stock ID: " + stockId;
        return ResponseEntity.ok(userStockInfo);
    }

    @PostMapping(value = "/user")
    public ResponseEntity<String> deleteStockFromUser(@PathVariable String userEmail, @PathVariable String stockId) throws Exception {
        this.service.deleteStockFromUser(userEmail,stockId);
        String userStockInfo = "User ID: " + userEmail + ", Stock ID: " + stockId;
        return ResponseEntity.ok(userStockInfo);
    }

    @DeleteMapping(value = "/{stockId}/user/{userId}")
    public void deleteStockToUser(@PathVariable("stockId") String stockName, @PathVariable("userId") Long id) {

    }
}
