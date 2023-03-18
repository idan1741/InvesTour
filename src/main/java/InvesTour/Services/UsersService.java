package InvesTour.Services;

import InvesTour.Models.User;
import InvesTour.utils.Json;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    public User getUserById(Long id){
        return Json.fromJson("", User.class);
    }
}
