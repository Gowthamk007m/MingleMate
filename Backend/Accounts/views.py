
from django.http import HttpResponse

# Create your views here.
def Home(request):
    return HttpResponse("Django Server Is Online")




