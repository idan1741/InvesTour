package InvesTour.Controllers;

import InvesTour.Services.StocksService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/stocks")
@AllArgsConstructor
public class StocksController {

    private final StocksService service;

    @PostMapping(value = "/user")
    public void addStockToUser(@RequestBody String userId, @RequestBody String stockName) {

    }

    @DeleteMapping(value = "/{stockId}/user/{userId}")
    public void deleteStockToUser(@PathVariable("stockId") String stockName, @PathVariable("userId") Long id) {

    }
}
