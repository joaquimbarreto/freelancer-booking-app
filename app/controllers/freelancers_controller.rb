class FreelancersController < ApplicationController

    def index
        @freelancers = Freelancer.all        
    end

    def show
        @freelancer = Freelancer.find(params[:id])
    end

    def new

    end

    def create
        
    end

    def edit
        
    end

    def update
        
    end

    def destroy
        
    end

    private

    def freelancer_params
        params.require(:freelancer).permit(:name, :username, :password)
    end

    def find_freelancer
        @freelancer = Freelancer.find(params[:id])
    end
    
end
