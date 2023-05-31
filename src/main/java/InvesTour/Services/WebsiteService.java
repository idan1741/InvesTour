package InvesTour.Services;

import InvesTour.Models.Website;
import InvesTour.dal.WebsiteRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WebsiteService {
    private final WebsiteRepository repository;

    @SneakyThrows
    public void addWebsiteToUser(String userEmail, String websiteId, String websiteName) {
        this.repository.addWebsiteToUser(userEmail, websiteId, websiteName);
    }

    @SneakyThrows
    public void deleteWebsiteFromUser(String userEmail, String websiteId, String websiteName) {
        this.repository.deleteWebsiteFromUser(userEmail, websiteId, websiteName);
    }

    public List<Website> getAllWebsitesByUserEmail(String userEmail) {
        return this.repository.getAllWebsitesByUserEmail(userEmail);
    }
}
