package InvesTour.Controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/stocks")
public class StocksController {

    @PostMapping(value = "/user")
    public void addStockToUser(@RequestBody String userId, @RequestBody String stockName) {

    }

    @DeleteMapping(value = "/{stockId}/user/{userId}")
    public void deleteStockToUser(@PathVariable("stockId") String stockName, @PathVariable("userId") Long id) {

    }
}
