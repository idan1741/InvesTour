package InvesTour.Controllers;

import InvesTour.Services.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/stocks")
@RequiredArgsConstructor
public class StocksController {
    private final UsersService service;

    @PostMapping(value = "/user")
    public ResponseEntity<String> addStockToUser(String userEmail, Long stockId) throws Exception {
        this.service.addStockToUser(userEmail, stockId);

        String userStockInfo = "User ID: " + userEmail + ", Stock ID: " + stockId;

        return ResponseEntity.ok(userStockInfo);
    }

    @PostMapping(value = "/user/delete")
    public ResponseEntity<String> deleteStockFromUser(@PathVariable String userEmail, @PathVariable Long stockId) throws Exception {
        this.service.deleteStockForUser(userEmail,stockId);
        String userStockInfo = "User ID: " + userEmail + ", Stock ID: " + stockId;
        return ResponseEntity.ok(userStockInfo);
    }

    @DeleteMapping(value = "/{stockId}/user/{userId}")
    public void deleteStockToUser(@PathVariable("stockId") String stockName, @PathVariable("userId") Long id) {

    }
}
