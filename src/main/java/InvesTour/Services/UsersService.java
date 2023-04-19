package InvesTour.Services;

import InvesTour.Exceptions.SignUpException;
import InvesTour.Models.User;
import InvesTour.dal.UserRepository;
import InvesTour.utils.Json;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UserRepository repository;

    private final StocksService stocksService;

    public User getUserById(Long id) {
        return Json.fromJson("", User.class);
    }

    public void signUp(User user) throws Exception {
        List<User> users = this.repository.getAllUsers();

        boolean isUserAlreadySignedUp = users.stream().anyMatch(currUser -> currUser.getEmail().equals(user.getEmail()));

        if (isUserAlreadySignedUp) {
            throw new SignUpException("already signed up");
        }

        this.repository.addUser(user);
    }

    public boolean login(String email, String password) {
        List<User> allUsers = this.repository.getAllUsers();

        return allUsers.stream()
                .anyMatch(user -> user.getEmail().equals(email) && user.getPassword().equals(password));
    }

    public void addStockToUser(String userEmail, String stockId) throws Exception {
        if(isRequestValid(userEmail,stockId)){
            repository.addStockToUser(userEmail,stockId);
        } else {
            throw new Exception("bad info");
        }
    }

    private boolean isRequestValid(String userEmail, String stockId){
        return this.stocksService.isStockExist(stockId) && this.isUserExist(userEmail);
    }

    public boolean isUserExist(String stockId){
        String string = repository.getUserById(stockId);
        return string.isEmpty();
    }

}
