package InvesTour.Controllers;

import InvesTour.Services.NewsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/news")
@AllArgsConstructor
public class NewsController {

    private final NewsService newsService;

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
