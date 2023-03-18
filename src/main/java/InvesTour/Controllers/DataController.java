package InvesTour.Controllers;

import InvesTour.Services.DataService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@AllArgsConstructor
public class DataController {

    private final DataService dataService;

    @GetMapping(value = "/main/graph")
    public void getGraph() {

    }

    @GetMapping(value = "/graph/user/{userId}")
    public void getGraphForUser(@PathVariable("userId") Long id) {

    }

    @GetMapping(value = "/graph/stock/{stockName}")
    public void getGraphForStock(@PathVariable("stockName") String stockName) {

    }

    @GetMapping(value = "/messages/stock/{stockName}")
    public void getMessagesForStock(@PathVariable("stockName") String stockName) {

    }

    @GetMapping(value = "/updates/stock/{stockName}")
    public void getUpdatesForStock(@PathVariable("stockName") String stockName) {

    }
}
