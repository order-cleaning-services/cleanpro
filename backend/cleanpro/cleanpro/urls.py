from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path # noqa
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from drf_yasg import openapi # noqa
from drf_yasg.views import get_schema_view # noqa
from rest_framework import permissions # noqa

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls', namespace='api')),
    path('spectacular/schema/', SpectacularAPIView.as_view(), name='schema'),
    path(
        'spectacular/docs/',
        SpectacularSwaggerView.as_view(url_name='schema'),
        name='docs',
    ),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )

# schema_view = get_schema_view(
#     openapi.Info(
#         title="CleanPro API",
#         default_version='v1',
#         description="Документация для приложения CleanPro",
#         contact=openapi.Contact(email="admin@cleanpro.ru"),
#         license=openapi.License(name="BSD License"),
#     ),
#     public=True,
#     permission_classes=(permissions.AllowAny,),
# )

# urlpatterns += [
#     re_path(r'^swagger(?P<format>\.json|\.yaml)$',
#             schema_view.without_ui(cache_timeout=0),
#             name='schema-json'),
#     re_path(r'^swagger/$',
#             schema_view.with_ui('swagger', cache_timeout=0),
#             name='schema-swagger-ui'),
#     re_path(r'^redoc/$',
#             schema_view.with_ui('redoc', cache_timeout=0),
#             name='schema-redoc')
# ]
