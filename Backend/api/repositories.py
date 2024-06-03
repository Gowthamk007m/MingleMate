from Accounts.models import User_Account 


class UserRepository:
    def get_all_User(self):
        return User_Account.object.all()
    
    def get_user(self,id):
        return User_Account.objects.get(id=id)
        
    def delete_user(self, user_id):
        user = self.get_user(user_id)
        user.delete()