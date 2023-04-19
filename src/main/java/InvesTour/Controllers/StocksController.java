package InvesTour.Controllers;

import InvesTour.Services.UsersService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/stocks")
@RequiredArgsConstructor
public class StocksController {
    private final UsersService service;

    @PostMapping("/user")
    public ResponseEntity<String> addStockToUser(@RequestBody JsonNode jsonBody) throws Exception {
        String userEmail = jsonBody.get("userEmail").asText();
        long stockId = jsonBody.get("stockId").asLong();

        this.service.addStockToUser(userEmail, stockId);

        String userStockInfo = "User ID: " + userEmail + ", Stock ID: " + stockId;

        return ResponseEntity.ok(userStockInfo);
    }

    @PostMapping(value = "/user/delete")
    public ResponseEntity<String> deleteStockFromUser(@RequestBody JsonNode jsonBody) throws Exception {
        String userEmail = jsonBody.get("userEmail").asText();
        long stockId = jsonBody.get("stockId").asLong();

        this.service.deleteStockForUser(userEmail,stockId);

        String userStockInfo = "User ID: " + userEmail + ", Stock ID: " + stockId;
        return ResponseEntity.ok(userStockInfo);
    }

    @DeleteMapping(value = "/{stockId}/user/{userId}")
    public void deleteStockToUser(@PathVariable("stockId") String stockName, @PathVariable("userId") Long id) {

    }
}
