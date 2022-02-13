FROM nginx

COPY build /usr/share/nginx/html

# docker build -t image-zoomer:latest .
# docker run -d -p 80:80 image-zoomer 