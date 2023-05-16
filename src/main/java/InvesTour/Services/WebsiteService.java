package InvesTour.Services;

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
    public void addWebsiteToUser(String userEmail, String websiteId) {
        this.repository.addWebsiteToUser(userEmail, websiteId);
    }

    @SneakyThrows
    public void deleteWebsiteFromUser(String userEmail, String websiteId) {
        this.repository.deleteWebsiteFromUser(userEmail, websiteId);
    }

    public List<String> getAllWebsitesByUserEmail(String userEmail) {
        return this.repository.getAllWebsitesByUserEmail(userEmail);
    }
}
