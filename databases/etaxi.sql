PGDMP                      |            etaxiDB    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24576    etaxiDB    DATABASE     �   CREATE DATABASE "etaxiDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "etaxiDB";
                postgres    false            �            1259    24622    hanhtrinh_sequence    SEQUENCE     {   CREATE SEQUENCE public.hanhtrinh_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.hanhtrinh_sequence;
       public          postgres    false            �            1259    24596 	   hanhtrinh    TABLE     C  CREATE TABLE public.hanhtrinh (
    id bigint DEFAULT nextval('public.hanhtrinh_sequence'::regclass) NOT NULL,
    khachhangid bigint,
    diachibatdau text NOT NULL,
    diachiketthuc text NOT NULL,
    sodienthoai text NOT NULL,
    nhanvienid bigint,
    tinhtrang integer DEFAULT 0 NOT NULL,
    nvhuychuyen bigint,
    diemdonlat numeric NOT NULL,
    diemdonlng numeric NOT NULL,
    diemdenlat numeric NOT NULL,
    diemdenlng numeric NOT NULL,
    tenkhachhang text NOT NULL,
    ngaytao time without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    nvtongdai bigint
);
    DROP TABLE public.hanhtrinh;
       public         heap    postgres    false    218            �            1259    24618    nguoidung_sequence    SEQUENCE     {   CREATE SEQUENCE public.nguoidung_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.nguoidung_sequence;
       public          postgres    false            �            1259    24590 	   nguoidung    TABLE     [  CREATE TABLE public.nguoidung (
    id bigint DEFAULT nextval('public.nguoidung_sequence'::regclass) NOT NULL,
    hoten text NOT NULL,
    matkhau text NOT NULL,
    phanloai integer DEFAULT 0 NOT NULL,
    sodienthoai text NOT NULL,
    ngaytao timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    lat numeric,
    lng numeric
);
    DROP TABLE public.nguoidung;
       public         heap    taxi    false    217            �          0    24596 	   hanhtrinh 
   TABLE DATA           �   COPY public.hanhtrinh (id, khachhangid, diachibatdau, diachiketthuc, sodienthoai, nhanvienid, tinhtrang, nvhuychuyen, diemdonlat, diemdonlng, diemdenlat, diemdenlng, tenkhachhang, ngaytao, nvtongdai) FROM stdin;
    public          postgres    false    216          �          0    24590 	   nguoidung 
   TABLE DATA           a   COPY public.nguoidung (id, hoten, matkhau, phanloai, sodienthoai, ngaytao, lat, lng) FROM stdin;
    public          taxi    false    215   .       �           0    0    hanhtrinh_sequence    SEQUENCE SET     @   SELECT pg_catalog.setval('public.hanhtrinh_sequence', 1, true);
          public          postgres    false    218            �           0    0    nguoidung_sequence    SEQUENCE SET     @   SELECT pg_catalog.setval('public.nguoidung_sequence', 1, true);
          public          postgres    false    217            `           2606    24603    hanhtrinh cuocxe_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.hanhtrinh
    ADD CONSTRAINT cuocxe_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.hanhtrinh DROP CONSTRAINT cuocxe_pkey;
       public            postgres    false    216            \           2606    24621    nguoidung sodienthoai 
   CONSTRAINT     W   ALTER TABLE ONLY public.nguoidung
    ADD CONSTRAINT sodienthoai UNIQUE (sodienthoai);
 ?   ALTER TABLE ONLY public.nguoidung DROP CONSTRAINT sodienthoai;
       public            taxi    false    215            ^           2606    24595    nguoidung users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.nguoidung
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.nguoidung DROP CONSTRAINT users_pkey;
       public            taxi    false    215            �      x������ � �      �      x������ � �     