package InvesTour.Controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/news")
public class NewsController {

    @GetMapping(value = "/articles")
    public void getAllArticles() {

    }

    @GetMapping(value = "/websites")
    public void getAllWebsites() {

    }

    @GetMapping(value = "/articles/user/{userId}")
    public void getArticlesByUser(@PathVariable("userId") Long id) {

    }

    @GetMapping(value = "/websites/user/{userId}")
    public void getWebsitesByUser(@PathVariable("userId") Long id) {

    }

    @GetMapping(value = "/user/{userId}/stock/{stockName}")
    public void getArticlesByUserAndStock(@PathVariable("userId") Long id, @PathVariable("stockName") String stockName) {

    }
}
